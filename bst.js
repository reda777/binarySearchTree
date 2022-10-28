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
    buildTree(arr){
        let root;
        if(arr.length<2){
            return null;
        }else {
            let half=(arr.length/2)>>0;
            let leftArr=[];
            let rightArr=[];
            let leftI=0;
            let rightI=0;
            let mainI=0;
            while(leftI<arr.length && rightI<arr.length-half){
                if(leftI<half){
                    leftArr[leftI++]=arr[mainI++];
                }else{
                    rightArr[rightI++]=arr[mainI++];
                }
            }
            root=new Node(arr[half]);
            /*console.log(root.data + " ");*/
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
console.log(prettyPrint(tree.root));