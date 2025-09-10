#定义一个函数，接收另一个函数作为传入参数
def fun_test(computer):
    result =computer (1,2)#确定computer是函数
    print(f"computer的类型是{type(computer)},结果是{result}")
#定义一个函数，准备作为参数传入另一个函数
def add(x,y):
    return x+y
fun_test(add)
