<!-- @format -->

# Blog Lite

This project is an implementation of a MutiUser Social Media app created in Vuejs.

# Local Setup

- Make sure you have the necessary requirements installed and updated, mentioned in the requirements.txt file. If not, just to be sure, go to terminal and run command `pip install -r requirements.txt`.


# Termianl Jobs

- For Running the Mail-Hog run the command `~/go/bin/MailHog`
- For Running the redis server, run the command `redis-server`
- For Running the Celery, run the command `celery -A app.celery worker -l info`
- For Runnig the Celery Beat, run the command `celery -A app.celery beat --max-interval 2 -l info`

# Make it Run

- After installing the requirments.txt, Go to the the terminal and run `python app.py`, after that you are good to go.
