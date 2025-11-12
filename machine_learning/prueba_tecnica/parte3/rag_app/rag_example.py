from dash import Dash, dcc, html, Input, Output, callback, ctx, State
import os
import openai
from langchain.memory import ConversationBufferMemory
from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI

from langchain.chains import ConversationalRetrievalChain
#import uuid
import time
from datetime import datetime

# functions for memory manipulation, every session is different

def memory_to_list(memory_chat):
    memlist=[]
    for i in  range(len(memory_chat)):
        msg_pair=[]
        if i%2==0:
            msg_pair.append({"input":memory_chat[i].content})
            msg_pair.append({"output":memory_chat[i+1].content})
            memlist.append(msg_pair)
    return memlist

def list_to_memory(memlist):
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True
    )
    for mem in memlist:
        memory.save_context(mem[0],mem[1])
    return memory




external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']



app = Dash(__name__, external_stylesheets=external_stylesheets)
server = app.server
app.title = 'Rag example'



# Initialize llm model
with open('filekey.txt','r') as keyfile:
    apiKey=keyfile.read()
apiKey=apiKey.replace('\n','')


openai.api_key = apiKey.strip()
persist_directory = 'birders/chroma/'
embedding = OpenAIEmbeddings(openai_api_key=openai.api_key)
vectordb = Chroma(persist_directory=persist_directory, embedding_function=embedding)
llm_name='gpt-3.5-turbo'
llm = ChatOpenAI(model_name=llm_name, temperature=0,openai_api_key=openai.api_key)



app.layout = html.Div([
    
    html.H3('Hola!, soy tu asistente de avistamiento de aves 🦤', style={'textAlign': 'center', 'marginBottom': 20}),
    html.Div(id='conversation', style={'overflowY': 'scroll', 'height': '400px', 'border': '1px solid #ddd', 'padding': '10px'}),
    html.Div([
        dcc.Input(id='user-text', type='text', placeholder='¿Que quieres saber?', size='50', style={'width': '70%', 'marginRight': '10px'}),
        html.Button('Enviar ➤', id='send', n_clicks=0, style={'fontSize': 18}),
    ], style={'display': 'flex', 'justifyContent': 'center', 'marginTop': 20}),
    dcc.Loading(id='load-conv', children=[html.Div(id='loader-div')], type='circle', style={'marginTop': 20}),
    dcc.Store(id='memory-store'),
    dcc.Store(id='conversation-line')
])



@app.callback(
    Output('conversation', 'children'),
    Output('loader-div', 'children'),
    Output('memory-store', 'data'),
    Output('conversation-line', 'data'),
    Output('user-text', 'value'),
    [Input('send', 'n_clicks'), 
    State('user-text', 'value'), 
    Input('memory-store','data'),
    Input('conversation-line','data')]
)
def display_value(n_clicks, person_text, memory_store,conversation_line):
    if person_text is None:
        person_text = ''
    conversation = ''
    final_conv = ''
    final_msg = ''
    if ctx.triggered_id == 'send' and person_text.strip() != '':
        if memory_store is None:
            memory_store=[]
        if conversation_line is None:
            conversation_line=[]
        
        # getting memory datatype
        
        memory=list_to_memory(memory_store)
        #print("Memoria",memory)
        # creating agent
        qa = ConversationalRetrievalChain.from_llm(
            llm,
            retriever=vectordb.as_retriever(),
            memory=memory,
    
        )
        
        gpt_answer=qa.invoke({"question":person_text})
        conversation_line.append((person_text,gpt_answer['answer']))
        #print(gpt_answer['answer'])
        final_conv = [html.Div([html.Div(['Yo: ' + conv[0]], 
                          style={'backgroundColor': '#FF8C3F', 'color': 'white', 'padding': '10px', 
                                'borderRadius': '10px', 'marginBottom': '5px','fontWeight': 'bold'
                                }),
                          html.Div(['Asistente: ' + conv[1]],style={'backgroundColor': '#ADD8E6', 
                                    'padding': '10px', 'borderRadius': '10px', 'marginBottom': '5px','fontWeight': 'bold'})]) for conv in conversation_line]
        actual_time = str(datetime.now())
        final_msg = f'Última Respuesta generada {actual_time}'
        
        # sending memory to json serializable for dcc store management
        memory_store=memory_to_list(memory.chat_memory.messages)
        #print("Parseado",memory_store)
    return html.Div(final_conv), final_msg,memory_store,conversation_line,''

if __name__ == '__main__':
    #app.run(host='172.21.7.111',port=8051,debug=True)
    app.run(debug=True)
