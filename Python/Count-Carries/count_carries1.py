
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
        l = v[0][::-1]
        r = v[1][::-1]
        llen = len(l)
        rlen = len(r)
        carry = 0

        target_count = llen if llen < rlen else rlen

        for i in range(target_count):
            if (int(l[i]) + int(r[i])) > 9:
                carry += 1
                
        carries.append(carry)

    print(f'Input: {pv}')
    print(f'Output: {carries}')


if __name__ == '__main__':
    main()