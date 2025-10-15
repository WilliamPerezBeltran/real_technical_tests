la prueba me la envio Stackless:

Hi William,

The challenge is <here> with all relevant information. Please follow the instructions in the README, and create a repo for yourself to push to. I will be expecting an email from you at 8PM Pacific Time (10PM Colombia) with a link to your repo. We will be checking to see if your commits are on time. If you have any questions please let me know.

The password you need is yHsrH^%M#7Lf

Best of luck


<here> => https://gist.github.com/nachimehta/2c08346c4fa39ab8fa43e20d3693a52a


# Stackless full-stack developer coding challenge

Your task is to build a Node.js (or Python) application that retrieves warehouse metrics from Snowflake, a cloud-based data warehousing platform. The application should store this information in a database table and display the metrics graphically over time in a front-end user interface.

## Requirements

### Retrieve Snowflake Warehouse Metrics
- Develop a Node.js (or Python) application that connects to the Snowflake using appropriate libraries or APIs using the following credentials:
  - username: interview_user
  - password: <in_email_sent_to_you>
  - endpoint: https://gza68067.snowflakecomputing.com
  - role: interview_rl
  - warehouse: interview_wh
  - database: interview_db
- Create an API that retrieves relevant warehouse metrics such as database size in gb, total number of rows, total number of tables and _data points_ defined as the sum of the number of columns of each table times the number of rows for that table for each table in the database.

### Database Integration
- Create a database (you can choose a database system like PostgreSQL, MySQL, or SQLite).
- Store the retrieved warehouse metrics in the database with a timestamp for when they were retrieved in UTC.
  
### Front-end
- Develop a front-end interface using a framework - React.
- Display a table where users can view metrics over time that looks like this (the numbers are not accurate):

    | datetime      | database size | rows | tables | data points |
    |---            |---            |---   |---     |---          |
    | 2023-10-10 20:18:53| 6.1GB    | 1.24M|52      | 225.2M      |
    | 2023-10-11 07:09:21| 6.2GB    | 1.35M|52      | 227.8M      |

- *(Optional)* Display the metrics graphically using charts or graphs (you can use libraries like D3.js, Chart.js, or others).

### Docker and Docker Compose
- Package your application components (Back-end app, database, and front-end) into Docker containers.
- Use Docker Compose to orchestrate the deployment of the entire application stack.
- Provide clear instructions for building and running the application stack using Docker and Docker Compose.
