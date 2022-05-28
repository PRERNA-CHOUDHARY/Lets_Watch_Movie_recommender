'''
app.py : The root python file to start the FastAPI Backend Server.

To run the application, use the following command:
>>> uvicorn app:app --reload
'''

'''
Python pickle module is used for serializing and de-serializing python object structures. The process to converts any kind of python objects (list, dict, etc.) into byte streams (0s and 1s) is called pickling or serialization or flattening or marshalling. 
'''

import pickle

'''
Pandas is an open-source library that is made mainly for working with relational or labeled data both easily and intuitively. It provides various data structures and operations for manipulating numerical data and time series.
'''

import pandas as pd

'''
The requests library is the de facto standard for making HTTP requests in Python. It abstracts the complexities of making requests behind a beautiful, simple API so that you can focus on interacting with services and consuming data in your application.
'''

import requests

'''
FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.
'''

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

'''
fetch_poster() function for fetching the posters of the recommended movies from The Movie DB API.
It returns the URL of the poster from IMDB API when we pass a suitable movie_id as a parameter.
'''

def fetch_poster(movie_id):
    response = requests.get('https://api.themoviedb.org/3/movie/{}?api_key=af526f5cf8216b8426ce52e6f5a9a573&language=en-US'.format(movie_id))
    data = response.json()
    
    full_path= "https://image.tmdb.org/t/p/w500/" + data['poster_path']
    return full_path

'''
recommend() function is the key function that takes movie as a parameter & returns the names of the movies using KNN Algorithm.
'''

def recommend(movie: str):
        movie_index=movies[movies['title']==movie].index[0]
        distances = similarity[movie_index]
        movies_list = sorted(list(enumerate(distances)),reverse=True,key= lambda x:x[1])[0:16]

        recommended_movies=[]
        recommended_movies_posters=[]
        for i in movies_list:
            movie_id=movies.iloc[i[0]].movie_id
            recommended_movies.append(movies.iloc[i[0]].title)
            recommended_movies_posters.append(fetch_poster(movie_id))
        return recommended_movies,recommended_movies_posters

movies_dict = pickle.load(open('movies_dict.pkl','rb'))
similarity= pickle.load(open('similarity.pkl','rb'))
movies = pd.DataFrame(movies_dict)

'''
CORS Setup for FastAPI.
'''

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

'''
The minimal FastAPI Backend Setup with the following routes:
1. / - Returns the status server response. If everything is OK, it returns {"server": "OK"}
2. /movie/{movie_name} - Returns the recommended movies & the related poster as a response.
'''

@app.get("/")
def main():
    return {"server": "OK"}

@app.get('/movie/{movie_name}')
def get_movies(movie_name: str):
    names,posters= recommend(movie_name)
    return names, posters