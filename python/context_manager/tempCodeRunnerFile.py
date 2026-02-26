import os
for i in range(100000):
    if os.path.exists(f"file_{i}.txt"):
        os.remove(f"file_{i}.txt")