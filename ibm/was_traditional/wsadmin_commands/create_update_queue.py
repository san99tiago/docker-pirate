# WSADMIN SCRIPT TO CREATE OR UPDATE QUEUES (IN THIS CASE ONE REQ AND ONE RES)
# Santiago Garcia Arango
# Command:
# wsadmin.sh -lang jython -f /tmp/test.py queue_req_name queue_req_jndi_name queue_res_name queue_res_jndi_name queue_manager

import sys

queue_req_name = sys.argv[0]
queue_req_jndi_name = sys.argv[1]
queue_res_name = sys.argv[2]
queue_res_jndi_name = sys.argv[3]
queue_manager = sys.argv[4]

def is_queue_created(queue_name):
    """
    Function to validate if a queue is created.
    :param queue_name: string of the name of the applications to check.
    :returns: string "Created" or "Not Created"
    """
    queues_list = AdminTask.listWMQQueues(AdminConfig.getid("/Cell:AWSCell01/")).splitlines()

    for queue in queues_list:
        if queue.startswith(queue_name + "("):
            return "Created"
    return "Not Created"

# Create or update queue 1
if (is_queue_created(queue_req_name) == "Created"):
    queues_list = AdminTask.listWMQQueues(AdminConfig.getid("/Cell:AWSCell01/")).splitlines()

    for queue in queues_list:
        if queue.startswith(queue_req_name + "("):
            queue_to_modify = queue
    print("Modifying queue...")
    AdminTask.modifyWMQQueue(queue_to_modify, '[-name ' + queue_req_name + ' -jndiName ' + queue_req_jndi_name + ' -queueName ' + queue_req_name + ' -qmgr ' + queue_manager + ' -description "Queue to communicate from AWS WAS to AWS MQ for HDC" ]') 
else:
    print("Creating queue...")
    AdminTask.createWMQQueue('AWSCell01(cells/AWSCell01|cell.xml)', '[-name ' + queue_req_name + ' -jndiName ' + queue_req_jndi_name + ' -queueName ' + queue_req_name + ' -qmgr ' + queue_manager + ' -description "Queue to communicate from AWS WAS to AWS MQ for HDC" ]') 


# Create or update queue 2
if (is_queue_created(queue_res_name) == "Created"):
    queues_list = AdminTask.listWMQQueues(AdminConfig.getid("/Cell:AWSCell01/")).splitlines()

    for queue in queues_list:
        if queue.startswith(queue_res_name + "("):
            queue_to_modify = queue
    print("Modifying queue...")
    AdminTask.modifyWMQQueue(queue_to_modify, '[-name ' + queue_res_name + ' -jndiName ' + queue_res_jndi_name + ' -queueName ' + queue_res_name + ' -qmgr ' + queue_manager + ' -description "Queue to communicate from AWS MQ to AWS WAS for HDC" ]') 
else:
    print("Creating queue...")
    AdminTask.createWMQQueue('AWSCell01(cells/AWSCell01|cell.xml)', '[-name ' + queue_res_name + ' -jndiName ' + queue_res_jndi_name + ' -queueName ' + queue_res_name + ' -qmgr ' + queue_manager + ' -description "Queue to communicate from AWS MQ to AWS WAS for HDC" ]') 

AdminConfig.save()
