import streamlit as st

from transformers import pipeline
model_path="cardiffnlp/twitter-roberta-base-sentiment-latest"
sentiment_task = pipeline("sentiment-analysis", model=model_path, tokenizer=model_path)
st.image("pizza_planet.png")
st.title("Welcome to Pizza planet reviews zone")
sentence = st.text_input('Please left your review here:') 
if sentence:
    result=sentiment_task(sentence)
    result=result[0]["label"]
    if result=='negative':
        result="Were so sad to hear this 😿 but we promise to improve our service"
    elif result=='positive':
        result="Cool! we're glad to hear that, hope to see you soon! 😺"
    elif result=='neutral':
        result='Thanks for your review 🧒'

else:
    result=''
st.write(result)
