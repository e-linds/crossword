

# top2 = [0,0]

# def find_top_2(head):
#     if head.left:
#         find_top_2(head.left)
#     if head.right:
#         find_top_2(head.right)
    
#     if head > top2[1]:
#         top2 = [top2[0], head]
#     elif top2[0] > head > top2[1]:
#         top2 = [head, top2[1]]

#     return top2[0]







# array = []



#another option

# array = []


# def get_top_2(head):
#     if head.left:
#         get_top_2(head.left)
#     if head.right:
#         get_top_2(head.right)

#     middle = array[math.ceil(len(array) / 2)]

#     if head > middle:


parent = None

def solution(parent, head):

    if head.right:
        solution(head, head.right)
    else:
        return parent


