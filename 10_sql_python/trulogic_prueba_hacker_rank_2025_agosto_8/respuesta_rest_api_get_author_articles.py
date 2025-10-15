import requests

def getArticleTitles(author):
    titles = []
    page = 1
    
    while True:
        # Construir la URL con el autor y número de página
        url = f"https://jsonmock.hackerrank.com/api/articles?author={author}&page={page}"
        response = requests.get(url)
        data = response.json()
        
        # Procesar artículos en esta página
        for article in data['data']:
            if article['title']:
                titles.append(article['title'])
            elif article['story_title']:
                titles.append(article['story_title'])
            # Si ambos son None, se ignora el artículo
        
        # Verificar si ya se llegó a la última página
        if page >= data['total_pages']:
            break
        page += 1
    
    return titles

# Ejemplo de uso
if __name__ == '__main__':
    author = input().strip()
    result = getArticleTitles(author)
    for title in result:
        print(title)
