import sys

def main(pin):
    lpin = len(pin)
    if lpin < 5:
        return pin
    else:
        return '#' * (lpin - 4) + pin[lpin - 4:]

if __name__ == '__main__':
    if len(sys.argv) == 2:
        print(main(sys.argv[1]))
    else:
        print('Missing Argument')