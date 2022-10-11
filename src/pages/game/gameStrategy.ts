/**
 *
 * @author csq
 */

/**
 * 获取1-6间随机整数
 * 
 * @returns 随机整数(1-6) 间
 */
export function getRandomInt():number{
    return Math.floor(Math.random()*(7-1)+1)
}

//检查吃子情况
export function checkEaten(grid:any[], value:number, index:number):number[]{
    let pointer = Math.floor(index/3);
    console.log(pointer)
    let redEaten:number[] = [];
    if(value == grid[pointer*3]){
        redEaten.push(pointer*3)
    }
    if(value == grid[pointer*3+1]){
        redEaten.push(pointer*3+1)
    }
    if(value == grid[pointer*3+2]){
        redEaten.push(pointer*3+2)
    }

    console.log(redEaten)

    return redEaten

}


//算分
export function countResult(a:any[],b:any[]):any{
    let add=0,sum1=0,sum2=0;
        while(add<9){
            if(a[add]==a[1+add] && a[add]==a[2+add]){
                sum1+=a[add]*9;
            }else if(a[add]==a[1+add]){
                sum1+=a[add]*4+a[2+add];
            }else if(a[add]==a[2+add]){
                sum1+=a[add]*4+a[1+add];
            }else if(a[1+add]==a[2+add]){
                sum1+=a[1+add]*4+a[add];
            }else{
                sum1+=a[add]+a[1+add]+a[2+add];
            }
            add+=3;
        }
        add=0;
        while(add<9){
            if(b[add]==b[1+add] && b[add]==b[2+add]){
                sum2+=b[add]*9;
            }else if(b[add]==b[1+add]){
                sum2+=b[add]*4+b[2+add];
            }else if(b[add]==b[2+add]){
                sum2+=b[add]*4+b[1+add];
            }else if(b[1+add]==b[2+add]){
                sum2+=b[1+add]*4+b[add];
            }else{
                sum2+=b[add]+b[1+add]+b[2+add];
            }
            add+=3;
        }
        return { blue:sum1, red:sum2 }
}