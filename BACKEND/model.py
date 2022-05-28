'''
model.py : The application that is responsible for generating pickle files used in recommendation of the movies.

To run the application & generate the pickle files, use the following command:
>>> python3 model.py
'''

'''
NumPy, which stands for Numerical Python, is a library consisting of multidimensional array objects and a collection of routines for processing those arrays. Using NumPy, mathematical and logical operations on arrays can be performed.
'''

import numpy as np

'''
Pandas is an open-source library that is made mainly for working with relational or labeled data both easily and intuitively. It provides various data structures and operations for manipulating numerical data and time series.
'''

import pandas as pd

'''
AST stands for Abstract Syntax Tree, which is a potent tool of the Python programming language. It allows us to interact with the Python code itself and can modify it.
'''

import ast

'''
NLTK is a toolkit build for working with NLP in Python. It provides us various text processing libraries with a lot of test datasets. A variety of tasks can be performed using NLTK such as tokenizing, parse tree visualization, etc.
'''

import nltk
from nltk.stem.porter import PorterStemmer

'''
Scikit-learn is a free machine learning library for Python. It features various algorithms like support vector machine, random forests, and k-neighbours, and it also supports Python numerical and scientific libraries like NumPy and SciPy.
'''

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

'''
Python pickle module is used for serializing and de-serializing python object structures. The process to converts any kind of python objects (list, dict, etc.) into byte streams (0s and 1s) is called pickling or serialization or flattening or marshalling. 
'''

import pickle


movies= pd.read_csv('mdbmovies.csv')
credits= pd.read_csv('mdbcredits.csv')
movies = movies.merge(credits,on='title')
movies = movies[['movie_id','title','overview','genres','keywords','cast','crew']]
movies.isnull().sum()
movies.dropna(inplace=True)
movies.iloc[0].genres

def convert(obj):
    l=[]
    for i in ast.literal_eval(obj):
        l.append(i['name'])
    return l

movies['genres']=movies['genres'].apply(convert)
movies['keywords']=movies['keywords'].apply(convert)

def convert2(obj):
    L = []
    counter = 0
    for i in ast.literal_eval(obj):
        if counter < 3:
            L.append(i['name'])
        counter+=1
    return L 

movies['cast'] = movies['cast'].apply(convert2)

def fetch_director(text):
    L = []
    for i in ast.literal_eval(text):
        if i['job'] == 'Director':
            L.append(i['name'])
    return L

movies['crew'] = movies['crew'].apply(fetch_director)
movies['overview'] =movies['overview'].apply(lambda x:x.split())
movies['genres']=movies['genres'].apply(lambda x:[i.replace(" ","") for i in x])
movies['keywords'] = movies['keywords'].apply(lambda x:[i.replace(" ","") for i in x])
movies['crew'] = movies['crew'].apply(lambda x:[i.replace(" ","") for i in x])
movies['cast'] = movies['cast'].apply(lambda x:[i.replace(" ","") for i in x])
movies['tag']=movies['overview']+movies['keywords']+movies['genres']+movies['cast']+movies['crew']
new_df= movies[['movie_id','title','tag']]
new_df['tag'] = new_df['tag'].apply(lambda x: " ".join(x))

ps=PorterStemmer()

def stem(text):
    y=[]
    for i in text.split():
       y.append(ps.stem(i))
    return " ".join(y)
new_df['tag'] = new_df['tag'].apply(stem)
new_df['tag'] = new_df['tag'].apply(lambda x:x.lower())
cv = CountVectorizer(max_features=2000,stop_words='english')
vectors = cv.fit_transform(new_df['tag']).toarray()
cv.get_feature_names()
similarity = cosine_similarity(vectors)
list(enumerate(similarity[0]))

def recommend(movie):
    movie_index=new_df[new_df['title']==movie].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)),reverse=True,key= lambda x:x[1])[1:6]
        
    for i in movies_list:
        print(new_df.iloc[i[0]].title)

'''
Testing the file with an example movie.
'''

recommend('Batman Begins')

'''
Dumping the pickle files.
'''

pickle.dump(new_df.to_dict(),open('movies_dict.pkl','wb'))
pickle.dump(similarity,open('similarity.pkl','wb'))