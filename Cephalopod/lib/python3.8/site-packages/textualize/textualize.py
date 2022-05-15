ones_place = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine'
}

tens_place = {
    2: 'twenty',
    3: 'thirty',
    4: 'forty',
    5: 'fifty',
    6: 'sixty',
    7: 'seventy',
    8: 'eighty',
    9: 'ninety'
}

teens = {
    0: 'ten',
    1: 'eleven',
    2: 'twelve',
    3: 'thirteen',
    4: 'fourteen',
    5: 'fifteen',
    6: 'sixteen',
    7: 'seventeen',
    8: 'eighteen',
    9: 'nineteen'
}

group_names = {
    1: 'thousand',
    2: 'million',
    3: 'billion',
    4: 'trillion',
    5: 'quadrillion',
    6: 'quintillion',
    7: 'sextillion'
}

def _textualize_group(group):
    """Get the text representation for group.
    
    A group is a sequence of 3 integers."""
    # The final string. A list is used for performance.
    ret_str = []

    ones = int(group[2])
    tens = int(group[1])
    hundreds = int(group[0])
    is_teen = False
    ones_str = ''
    tens_str = ''
    hundreds_str = ''

    if hundreds > 0:
        hundreds_str = '{} hundred'.format(ones_place[hundreds])

    if tens > 0:
        if tens == 1:
            is_teen = True
            tens_str = teens[ones]
        else:
            tens_str = tens_place[tens]
    if ones > 0 and not is_teen:
        ones_str = ones_place[ones]

    # Create the final string

    if hundreds_str:
        ret_str.append(hundreds_str)
        # Add a space if there is a tens
        # or ones place digit.
        if tens_str or ones_str:
            ret_str.append(' ')

    if tens_str:
        ret_str.append(tens_str)
        # Add a space or hyphen depending
        # on the ones place digit.
        if ones_str:
            if tens > 1:
                ret_str.append('-')
            else:
                ret_str.append(' ')

    if ones_str:
        ret_str.append(ones_str)
    return ''.join(ret_str)

def textualize(num):
    """Get the textual representation of num."""
    if isinstance(num, float):
        num = int(num)
    # special case
    if num == 0:
        return 'zero'

    # if the number is negative, we put the word
    # 'negative' in front of it.
    is_negative = False
    if num < 0:
        is_negative = True
        num = -1 * num

    num = str(num)
    # pad with zeroes
    while len(num) % 3 != 0:
        num = ''.join([ '0', num ])

    # as groups are textualized, their strings will be
    # appended to this list
    num_string = []
    group_counter = 0
    while len(num) > 0:
        group = num[-3:]
        num = num[:-3]
        text = _textualize_group(group)

        # thousand, million, etc.
        if group_counter > 0 and text:
            group_name = group_names[group_counter]
            text = ' '.join([ text, group_name ])

        if text:
            num_string.insert(0, text)

        group_counter += 1

    if is_negative:
        num_string.insert(0, 'negative')

    return ' '.join(num_string)

# convenience, "i to str"
i2s = textualize

__all__ = (
        'textualize',
        'i2s'
)
