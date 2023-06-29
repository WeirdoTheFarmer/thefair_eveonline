import psycopg2
from db_config import db_config
from datetime import datetime


def create_user(_username, _password, _email, _created_on):

    """Connect to the PostgreSQL database server """
    conn = None

    sql = 'INSERT INTO accounts(username, password, email, created_on) VALUES (%s, %s, %s, %s);'

    try:
        params = db_config()

        print("Connecting to the PostgreSQL database")
        conn = psycopg2.connect(**params)

        #create cursor. Allows Python code to execute PostgreSQL command in a database session.
        cur = conn.cursor()

        cur.executemany(sql, ([username, password, email, datetime.now()],))

        conn.commit()

        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print("Database connection closed")

#TODO
def remove_user():
    
    sql = "DELETE FROM accounts WHERE user_id = %s;"

    conn = None

    try:
        params = db_config()

        conn=psycopg2.connect(**params)

        cur = conn.cursor()
        
        cur.execute(sql, (7,))


    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    
    finally:
        if conn is not None:
            conn.close()
            print("Database connection closed")

