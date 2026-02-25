# garbage collection
import gc

# Automatic garbage collection - threshold
print("Garbage collection thresholds:", gc.get_threshold())
# [generation0, generation1, generation2]

# Manual garbage collection
def create_circular_reference():
    a = []
    b = [a]
    a.append(b)
    
create_circular_reference()
print("Garbage collection counts before:", gc.get_count())

# Force garbage collection
gc.collect()

print("Garbage collection counts after:", gc.get_count()) # [0, 0, 0] - all generations have been collected


# Enabling and disabling garbage collection
gc.disable()  # Disable automatic garbage collection
print("Garbage collection enabled:", gc.isenabled())  # False
gc.enable()  # Enable automatic garbage collection
print("Garbage collection enabled:", gc.isenabled())  # True
