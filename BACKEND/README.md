<p align="center">
  <img src="https://user-images.githubusercontent.com/77505989/170704366-cf4dd544-d723-4523-9f48-6567b7db722e.png" alt="BACKEND BANNER" />
</p>

## Let's Watch Backend API

**Let's Watch** is using FastAPI as a Backend Service. FastAPI is a modern, fast (high-performance) web framework for building `APIs` with Python 3.6+ based on standard Python-type hints.
#### The key features of FastAPI are:
- **Fast**: Very high performance, on par with NodeJS and Go. One of the rapid Python frameworks available.
- **Fast to code**: Increase the speed to develop features by about 200% to 300%.
- **Fewer bugs**: Reduce about 40% of human (developer) induced errors.
- **Intuitive**: Great editor support. It takes less time for debugging.


#### The Endpoints:
1. `/` - Returns the status server response. If everything is OK, it returns {"server": "OK"}
2. `/movie/{movie_name}` - Returns the recommended movies & the related poster as a response.
'''

```
@app.get("/")
def main():
    return {"server": "OK"}

@app.get('/movie/{movie_name}')
def get_movies(movie_name: str):
    names,posters= recommend(movie_name)
    return names, posters
```

## The Movie Recommendation System

As the backend receives a `movie_name` requested from the website, the trained model compares it with genre, title, cast, director & outline of other (similar) movies in the dataset. And based on the **cosine similarity algorithm - it returns the top nearest neighbors.**

#### Cosine Similarity

<p align="center">
  <img src="https://user-images.githubusercontent.com/77505989/170713214-f65bdb46-5f4b-453d-b98c-3ecdfdd4ac05.png" alt="COSINE SIMILARITY" />
</p>

It is a metric, helpful in determining, how similar the data objects are irrespective of their size. We can measure the similarity between two sentences in Python using Cosine Similarity. In cosine similarity, data objects in a dataset are treated as a vector.

The formula to find the cosine similarity between two vectors is –

```
Cos(x, y) = x . y / ||x|| * ||y||
```

where,

- **x . y** = product (dot) of the vectors ‘x’ and ‘y’.
- **||x|| and ||y||** = length of the two vectors ‘x’ and ‘y’.
- **||x|| * ||y||** = cross product of the two vectors ‘x’ and ‘y’.

#### Datasets:
- Movies - [mbdmovies.csv](https://drive.google.com/file/d/1yeeMHGxASYv35C0cI2Lv7_FjGmg-51kV/view?usp=sharing)
- Credits - [mdbcreadits.csv](https://drive.google.com/file/d/15fcc0vakxcOgylnjkOtCO1lPTRSIwMMg/view?usp=sharing)

## Working

To run the server, download the **datasets** provided in the `/BACKEND` directory of the project. Then run,

```
>>> python3 model.py
```

It will generate the pickle files that will be used in the recommendation system. Then,

```
>>> python3 uvicorn app:app --reload
```
