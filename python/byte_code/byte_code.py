from pvm import get_pvm

if __name__ == "__main__":
    print("Hello, World!") # no .pyc file is generated
    print(get_pvm()) # .pyc file is generated to improve performance on subsequent runs
    