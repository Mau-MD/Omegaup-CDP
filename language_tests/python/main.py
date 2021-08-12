import sys

GRUPO = 'easy/' # sin_grupo/, easy/, ...
CASO = '1'

sys.stdin = open(GRUPO + CASO + '.in', 'r')
sys.stdout = open(GRUPO + CASO + '.out', 'w')
num1 = int(input())
num2 = int(input())

print(num1 + num2)
print(num1 * num2)


