
def get_positive_int():
    pos_pair_int = tuple(input('Enter Positive Integer: ').split(' ', 2)[:2])
    return pos_pair_int

def main():
    pq = int(input('Pair Quantity: '))
    pv = []
    carries = []

    for i in range(pq):
        pv.append(get_positive_int())

    for v in pv:
        target_count = 1

        if len(v[0]) < len(v[1]):
            target_count += len(v[0])
        else:
            target_count += len(v[1])
        
        carry = 0
        for i in range(-1, -target_count, -1):
            if (int(v[0][i]) + int(v[1][i])) > 9:
                carry += 1
        carries.append(carry)

    print(f'Input:\n{pv}')
    print(f'Output:\n{carries}')


if __name__ == '__main__':
    main()