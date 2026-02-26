class ConnectionError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
        
class DataProcessingError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
        
def fetch_data():
    raise ConnectionError("Failed to connect to the data source.")

def process_data():
    try:
        fetch_data()
    except ConnectionError as ce:
        raise DataProcessingError("Data processing failed due to connection error.") from ce
    
print("Exception Chaining in Python:") # both __cause__ and __context__ should show the original ConnectionError
try:
    process_data()
except DataProcessingError as dpe:
    print(f"DataProcessingError caught: {dpe.message}")
    if dpe.__cause__:
        print("cause attribute is available.")
        print(dpe.__cause__)  # Should print the original ConnectionError message
        print(f"Original exception: {dpe.__cause__.message}") # print same message from the original exception
        
    # Context Attribute (set by Python as default when an exception is raised in an except block)
    print("Context Attribute:", dpe.__context__)  # Should also show the original ConnectionError
    
def process_data_without_chaining():
    try:
        fetch_data()
    except ConnectionError as ce:
        raise DataProcessingError("Data processing failed due to connection error.")  # No 'from ce' here
    
print("\nException without Chaining:") # __context__ is set but not __cause__
try:
    process_data_without_chaining()
except DataProcessingError as dpe:
    print(f"DataProcessingError caught: {dpe.message}")
    if dpe.__cause__:
        print("cause attribute is available.")
        print(dpe.__cause__)  # Should be None since we didn't use 'from ce'
    else:
        print("cause attribute is not available.")
    
    # Context Attribute (set by Python as default when an exception is raised in an except block)
    print("Context Attribute:", dpe.__context__)
    
    
print("\nSuppressing Context with 'from None':") # Both __cause__ and __context__ should be None when using 'from None'
def process_data_suppressing_context():
    try:
        fetch_data()
    except ConnectionError as ce:
        raise DataProcessingError("Data processing failed due to connection error.") from None  # Suppress context and cause
    
try:
    process_data_suppressing_context()
except DataProcessingError as dpe:
    print(f"DataProcessingError caught: {dpe.message}")
    if dpe.__cause__:
        print("cause attribute is available.")
        print(dpe.__cause__)  # Should be None since we used 'from None'
    else:
        print("cause attribute is not available.")
    
    # Should also be None due to 'from None' inspite of the default context chaining behavior of Python
    print("Context Attribute:", dpe.__context__)
