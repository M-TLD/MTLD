import pandas as pd
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.decorators import api_view
from django.http import HttpResponse
from .models import Condition
from collections import OrderedDict

# Create your views here.
@api_view(['GET','POST'])
def disease_predict(request):
   if request.method=='POST':
      data=json.loads(request.body.decode('utf-8'))
      print(' '.join(data))
      condition=' '.join(data)

      df = pd.read_csv('disease_prediction/disease_data/disease.csv',engine='python', encoding='cp949')

      current_condition=pd.DataFrame(data=[['9999', condition]], columns=['num','condition'])
      df=df.append(current_condition)

      df_condition=df['condition'].fillna('').values
      index=df['num']
      tf_idf_model=TfidfVectorizer().fit(df_condition)
      word_id_list=sorted(tf_idf_model.vocabulary_.items(),key=lambda x: x[1], reverse=False)
      word_list=[x[0] for x in word_id_list]
      tf_idf_df=pd.DataFrame(tf_idf_model.transform(df_condition).toarray(), columns=word_list)
      cos_sim_df=pd.DataFrame(cosine_similarity(tf_idf_df,tf_idf_df),columns=index,index=index)

      result=cos_sim_df.loc['9999']
      weight_index=['112','5','1047','355','389','4','926','491','542']
      for x in index:
         result[x]=result[x]+0.1
      result['9999']=0
      result=result.sort_values(ascending=False)
      data=df.loc[result.index[0:3]-1][['disease_name','define','image_url']]
      return HttpResponse(data.to_json(orient='records'))

   elif request.method=='GET':
      condition=pd.read_csv('disease_prediction/disease_data/condition.csv',engine='python', encoding='cp949')
      condition_list=pd.read_csv('disease_prediction/disease_data/condition_list.csv',engine='python', encoding='cp949')
      condition_data=OrderedDict()

      curr=0
      next=-1
      for x in range(0,12):
         curr=next+1
         next=next+condition_list.loc[x,'condition_num']
         condition_data[condition_list.loc[x,'condition_name']]=condition.loc[curr:next].to_dict('records')

      return HttpResponse(json.dumps(condition_data,ensure_ascii=False))


def condition_predict(word_list,tf_idf_df,condition):
   word_df=pd.DataFrame()

