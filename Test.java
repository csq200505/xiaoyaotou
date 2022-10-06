import java.util.Random;
import java.util.Scanner;

/**
    *请在这里写类的功能
    *
    *@author csq
    *@since 2022/10/1
*/public class Test {
    public static void main(String[] args){
        int[] a=new int[9];
        int[] b=new int[9];
        int m=0,n=0;
        Random random=new Random();
        int randomNum;
        Scanner sc=new Scanner(System.in);
        int input;
        while(true){
            randomNum=random.nextInt(6)+1;
            System.out.println("A方摇数："+randomNum);
            System.out.print("请A方放置：");
            input=sc.nextInt();
            if(a[input]==0){
                a[input]=randomNum;
                m++;
                int index;
                index=input/3;
                if(b[index*3]==randomNum){
                    b[index*3]=0;
                    n--;
                    System.out.println("吃！");
                }
                if(b[index*3+1]==randomNum){
                    b[index*3+1]=0;
                    n--;
                    System.out.println("吃！");
                }
                if(b[index*3+2]==randomNum){
                    b[index*3+2]=0;
                    n--;
                    System.out.println("吃！");
                }
            }else System.out.println("该位非空");
            if(m>=9) break;

            randomNum=random.nextInt(6)+1;
            System.out.println("B方摇数："+randomNum);
            System.out.print("请B方放置：");
            input=sc.nextInt();
            if(b[input]==0){
                b[input]=randomNum;
                n++;
                int index;
                index=input/3;
                if(a[index*3]==randomNum){
                    a[index*3]=0;
                    m--;
                    System.out.println("吃！");
                }
                if(a[index*3+1]==randomNum){
                    a[index*3+1]=0;
                    m--;
                    System.out.println("吃！");
                }
                if(a[index*3+2]==randomNum){
                    a[index*3+2]=0;
                    m--;
                    System.out.println("吃！");
                }
            }else System.out.println("该位非空");
            if(n>=9) break;
        }
        System.out.println("游戏结束");
        int add=0,sum1=0,sum2=0;
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
        System.out.println("Ascore："+sum1);
        System.out.println("Bscore："+sum2);
        if(sum1>sum2) System.out.println("A WIN");
        else if(sum1<sum2) System.out.println("B WIN");
        else System.out.println("TIED");
    }
}
