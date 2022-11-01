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
    insert(node,value){
        
        if(node==null){
            return new Node(value);
        }
        if(value==node.data){
            return null;
        }
        if(value<node.data){
            node.left=this.insert(node.left,value);
        }else{
            node.right=this.insert(node.right,value);
        }
        return node;
    }
    delete(node,value){
        if (node==null){
            return null;
        }
        if(value<node.data){
            node.left=this.delete(node.left,value);
        }else if(value>node.data){
            node.right=this.delete(node.right,value);
        }else{
            //no childs
            if(node.left==null && node.right==null){
                return null;
            }else if(node.left!=null && node.right!=null){//two childs
                let childL;
                let temp;
                temp=node.left;
                while (temp.right != null) {
                    temp = temp.right;
                }
                childL=temp;
                node.data = predecessor.data;
                node.left = this.delete(node.left, predecessor.data);
            }else{// one child
                node = (node.left != null) ? node.left: node.right;
            }
        }
        return node;
    }
    find(node,value){
        if(node==null || node.data==value){
            return node;
        }
        if(value<node.data){
            return this.find(node.left,value);
        }else{
            return this.find(node.right,value);
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
let tree=new Tree(array2);
console.log(prettyPrint(tree.root));
console.log(tree.find(tree.root,4));
console.log(tree.find(tree.root,2));

