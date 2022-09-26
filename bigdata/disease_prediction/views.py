import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.decorators import api_view
from django.http import HttpResponse

# Create your views here.
@api_view(['GET'])
def get_post(request,condition):
    if request.method=='GET':
        df = pd.read_csv('disease_prediction/disease_data/disease.csv',engine='python', encoding='cp949')

        dd=pd.DataFrame(data=[['9999', condition]], columns=['num','condition'])
        df=df.append(dd)
        df.set_index('num')

        condition=df['condition'].fillna('').values
        index=df['num']
        tf_idf_model=TfidfVectorizer().fit(condition)
        word_id_list=sorted(tf_idf_model.vocabulary_.items(),key=lambda x: x[1], reverse=False)
        word_list=[x[0] for x in word_id_list]
        tf_idf_df=pd.DataFrame(tf_idf_model.transform(condition).toarray(), columns=word_list, index=index)
        cos_sim_df=pd.DataFrame(cosine_similarity(tf_idf_df,tf_idf_df),columns=index,index=index)

        result=cos_sim_df.loc['9999']
        result['9999']=0
        result=result.sort_values(ascending=False)
        # result.index[0:5].to_json() 
        return HttpResponse(df.loc[result.index[0:5]-1].to_json())
        # df.loc[result.index[1]-1]
