from dirsync import sync


app = Celery('tasks',                                
    broker_url = 'amqp://myuser:mypassword@localhost:
5672/myvhost',                                       
                                                     
    result_backend = 'redis://localhost:6379/1',     
                                                     
                                                     
    REDIS_DB=1,                                      
    CELERY_DEFAULT_QUEUE = 'valut/new_connection'        
)                                                    


@app.task
def main():



@app.task
def Sync
sync(sourcedir, targetdir, action, **options)
