from celery import Celery

app = Celery('Cephalopod',
             broker='amqp://',
             backend='rpc://',
             include=['Cephalopod'])

# Optional configuration, see the application user guide.
app.conf.update(
    result_expires=3600,
)


