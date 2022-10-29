let sortDup=function sortAndRemoveDuplicate(array){

    array.sort((a,b)=>{return a-b;});
    array=[...new Set(array)];
    return array;
}
class Node{
    constructor(data){
        this.data=data;
        this.left=null;
        this.right=null;
    }
}
class Tree{
    constructor(array){
        this.root=this.buildTree(sortDup(array));
    }
    buildTree(arr){//1234
        let half,root;
        let leftArr=[];
        let rightArr=[];
        if(arr.length==0){
            return null;
        }else if(arr.length==1){
            half=(arr.length/2)>>0;
            root=new Node(arr[half]);
            return root;
        }else{
            let j=0;
            half=(arr.length/2)>>0;
            root=new Node(arr[half]);
            //populating left array
            for(let i=0;i<half;i++){
                leftArr[i]=arr[i];
            }
            //populating right array
            for(let i=half+1;i<arr.length;i++){
                rightArr[j]=arr[i];
                j+=1;
            }
            root.left=this.buildTree(leftArr);
            root.right=this.buildTree(rightArr);
            return root;
        }
        
    }
        
}
function prettyPrint(node, prefix = '', isLeft = true){
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
let array=[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let array2=[1,3,4,6,7,8,10,13,14];
console.log(sortDup(array2));
let tree=new Tree(array2);
console.log(tree.root);
console.log(prettyPrint(tree.root));