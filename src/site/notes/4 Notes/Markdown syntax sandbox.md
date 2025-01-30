---
{"dg-publish":true,"permalink":"/4-notes/markdown-syntax-sandbox/"}
---

# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

# Basic syntax highlighting:
**Bold text**
*Italic text*
***Italic and bold text***
==Highlighted text==
==Highlighted **bold** and *italic*==
`inline code`
```shell
Code block
```
$inline \; math$
$$math \; block$$
> [!QUOTE] Quote with callout

> Quote with \>

# Callouts: 

> [!note]

> [!info] Info, Todo

> [!abstract] Abstract, Summary, Tldr

> [!tip] Tip, Hint, Important

> [!success] Success, Check, Done

> [!question] Question, Help, FAQ

> [!warning] Warning, Caution, Attention

> [!failure] Failure, Fail, Missing

> [!danger] Danger, Error

> [!bug]

> [!example]

> [!quote] Quote, Cite

# Code blocks:

Inline `import numpy as n`

```python
# Variables and basic data types
integer = 10
floating_point = 3.14
string = "Hello, World!"
boolean = True
none_type = None

# Lists, tuples, sets, and dictionaries
my_list = [1, 2, 3, 4]
my_tuple = (5, 6, 7, 8)
my_set = {9, 10, 11}
my_dict = {"a": 1, "b": 2}

# Control flow: if-else, loops
for i in range(5):
  if i % 2 == 0:
      print(f"{i} is even")
  else:
      print(f"{i} is odd")

# While loop
count = 0
while count < 3:
  print(f"Count is {count}")
  count += 1

# Functions, arguments, and return values
def add(a, b):
  return a + b

result = add(5, 10)

# Lambda functions
square = lambda x: x ** 2
print(square(5))

# List comprehensions
squares = [x ** 2 for x in range(10)]

# Exception handling
try:
  division = 10 / 0
except ZeroDivisionError as e:
  print(f"Error: {e}")
finally:
  print("Finished exception handling.")

# Classes and inheritance
class Animal:
  def __init__(self, name):
      self.name = name
  
  def speak(self):
      return f"{self.name} makes a sound."

class Dog(Animal):
  def speak(self):
      return f"{self.name} barks."

dog = Dog("Rex")
print(dog.speak())

# Decorators
def decorator(func):
  def wrapper():
      print("Before function call")
      func()
      print("After function call")
  return wrapper

@decorator
def say_hello():
  print("Hello!")

say_hello()

# File I/O
with open("test_file.txt", "w") as file:
  file.write("This is a test.")

# Imports
import math
print(math.sqrt(16))

# F-strings
name = 'Python'
version = 3.9
print(f"Welcome to {name} {version}!")
```
