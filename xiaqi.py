import math
import numpy
import os
import tqdm
import copy


def score(table):
    sumt = 0
    for vec in table:
        cal = [0, 0, 0, 0, 0, 0]
        for i in vec:
            cal[i - 1] += 1

        for i in range(len(cal)):
            sumt += (i + 1) * (cal[i] * cal[i])

    return sumt


def fit(table, pos):
    apos = 1
    if pos == 1:
        apos = 0
    for i in range(len(table[pos])):
        for j in range(len(table[apos][i])):
            k = 0
            while k < len(table[pos][i]):
                if table[apos][i][j] == table[pos][i][k]:
                    table[pos][i].pop(k)
                    k = k - 1
                k = k + 1
    return table



class Node(object):

    def __init__(self, table=[], val=None, max: bool=True) -> None:
        '''
        val: 节点值
        max: 是否为max层
        childern: 子节点列表
        '''
        self.val = val	# 该节点的值
        self.max = max	# 该层是否为max层，默认顶层节点为max层
        self.table = table
    # 该节点的子节点

class Tree(object):

    def __init__(self, node, layernum) -> None:
        '''
        data_list: 数据列表
        '''
        self.node = node    # Node()，根节点
        self.layernum = layernum
        self.parent = None
        self.pos = -1
        self.children : list = []

    def build_tree(self) -> None:
        if self.layernum == 0:
            return

        is_max = self.node.max
        if is_max == True:
            is_max = False  # min层
        else:
            is_max = True   # max层

        self.children = [[],[],[],[],[],[]]

        for i in range(6):
            for j in range(3):
                if is_max == False:
                    if len(self.node.table[0][j]) < 3:
                        temptable = copy.deepcopy(self.node.table)
                        temptable[0][j].append(i+1)
                        temptable = fit(temptable, 1)
                        Nodetemp = Node(temptable)
                        Nodetemp.max = is_max
                        Treetemp = Tree(Nodetemp, self.layernum - 1)
                        Treetemp.pos = j
                        Treetemp.parent = self
                        Treetemp.build_tree()
                        self.children[i].append(Treetemp)
                else:
                    if len(self.node.table[1][j]) < 3:
                        temptable = copy.deepcopy(self.node.table)
                        temptable[1][j].append(i+1)
                        temptable = fit(temptable, 0)
                        Nodetemp = Node(temptable)
                        Nodetemp.max = is_max
                        Treetemp = Tree(Nodetemp, self.layernum - 1)
                        Treetemp.pos = j
                        Treetemp.parent = self
                        Treetemp.build_tree()
                        self.children[i].append(Treetemp)


        return


    def scoreval(self):
        if self.layernum == 0:
            score1 = score(self.node.table[0])
            score2 = score(self.node.table[1])
            if score1 > score2:
                self.node.val = 0
            elif score1 == score2:
                self.node.val = 0.5
            else:
                self.node.val = 1

            return
        self.node.val = 0
        self.rec = [100, 100, 100, 100, 100, 100]
        self.rec2 = [-1, -1, -1, -1, -1, -1]
        for i in range(len(self.children)):
            for j in self.children[i]:
                if j.node.val == None:
                    j.scoreval()
                if self.node.max == True:
                    if self.rec[i] > j.node.val:
                        self.rec[i] = j.node.val
                else:
                    if self.rec2[i] < j.node.val:
                        self.rec2[i] = j.node.val

        if self.node.max == True:
            self.node.val = numpy.mean(self.rec)
        else:
            self.node.val = numpy.mean(self.rec2)
        return


def nextstep(ownboard, otherboard, figure):
        table = [[], []]
        level = 4
        for i in range(3):
            temp = []
            for j in range(3):
                if ownboard[i * 3 + j] != 0:
                    temp.append(ownboard[i * 3 + j])
            table[1].append(temp)
        for i in range(3):
            temp = []
            for j in range(3):
                if otherboard[i * 3 + j] != 0:
                    temp.append(otherboard[i * 3 + j])
            table[0].append(temp)
        root = Node(table, None, False)
        tree = Tree(root, level)
        tree.build_tree()
        tree.scoreval()
        best = -1
        pos = -1
        for i in range(len(tree.children[figure - 1])):
            if tree.children[figure - 1][i].node.val > best:
                pos = tree.children[figure - 1][i].pos
                best = tree.children[figure - 1][i].node.val

        for i in range(3):
            if ownboard[pos * 3 + i] == 0:
                return pos * 3 + i #+1


if __name__ == "__main__":
    # table = [[[1, 4], [3],[6]], [[3],[4, 5], [3]]]
    # # table2 = [[[1, 4, 1], [3, 1], []], [[3, 3], [4, 5], [3, 6]]]
    # # print(table2[0])
    # # print(score(table2[0]))
    # # print(score(table2[1]))
    # root = Node(table, None, False)
    # tree = Tree(root, 4)1···
    # tree.build_tree()
    # tree.scoreval()
    # a = 1

    print(nextstep([6, 2, 0, 0, 0, 0, 2, 3, 0], [4, 4, 4, 0, 0, 0, 0, 0, 0], 6))