//模拟java的 Thread.sleep()方法，让线程休眠
//相似的地方在于，两个方法都不会释放持有的线程锁
export function sleep(d:number){
    for(let t = Date.now();Date.now() - t <= d;);
}