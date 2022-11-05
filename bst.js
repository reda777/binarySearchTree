const sortDup=function sortAndRemoveDuplicate(array){
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
    insert(value,node=this.root){
        
        if(node==null){
            return new Node(value);
        }
        if(value==node.data){
            return null;
        }
        if(value<node.data){
            node.left=this.insert(value,node.left);
        }else{
            node.right=this.insert(value,node.right);
        }
        return node;
    }
    delete(value,node=this.root){
        if (node==null){
            return null;
        }
        if(value<node.data){
            node.left=this.delete(value,node.left);
        }else if(value>node.data){
            node.right=this.delete(value,node.right);
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
                node.left = this.delete( predecessor.data,node.left);
            }else{// one child
                node = (node.left != null) ? node.left: node.right;
            }
        }
        return node;
    }
    find(value,node=this.root){
        if(node==null || node.data==value){
            return node;
        }
        if(value<node.data){
            return this.find(value,node.left);
        }else{
            return this.find(value,node.right);
        }
    }
    levelOrder(callbackFn){
        let queue=[];
        let arr=[];
        let currentNode;
        queue.push(this.root);
        while(queue.length>0){
            currentNode=queue[0];
            if(callbackFn){
                callbackFn(currentNode);
            }else{
                arr.push(currentNode.data);
            }
            if(currentNode.left!=null) queue.push(currentNode.left);
            if(currentNode.right!=null) queue.push(currentNode.right);
            queue.shift();
        }
        return arr;
    }
    inorder(node=this.root,arr=[],callbackFn=null){
        if(node==null){
            return null;
        }
        this.inorder(node.left,arr);
        if(callbackFn)
            callbackFn(node.data);
        else
            arr.push(node.data);
        this.inorder(node.right,arr);
        return arr;
    }
    preorder(node=this.root,arr=[],callbackFn=null){
        if(node==null){
            return null;
        }
        if(callbackFn)
            callbackFn(node.data);
        else
            arr.push(node.data);
        this.inorder(node.left,arr);
        this.inorder(node.right,arr);
        return arr;
    }
    postorder(node=this.root,arr=[],callbackFn=null){
        if(node==null){
            return null;
        }
        this.inorder(node.left,arr);
        this.inorder(node.right,arr);
        if(callbackFn)
            callbackFn(node.data);
        else
            arr.push(node.data);
        return arr;
    }
    height(node){
        if (node == null || (node.left==null&&node.right==null)) {
            return 0;
        }
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
    depth(node,root=this.root){
        if(node==root || node==null){
            return 0;
        }
        if(node.data<root.data){
            return 1+this.depth(node,root.left);
        }
        else{
            return 1+this.depth(node,root.right);
        }
    }
    isBalanced(root=this.root){
        if(root==null){
            return true;
        }
        let Lheight=this.height(root.left);
        let Rheight=this.height(root.right);
        if(Math.abs(Lheight-Rheight)<=1 && this.isBalanced(root.left) && this.isBalanced(root.right))
            return true;
        return false;
    }
    rebalance(){
        this.root=this.buildTree(this.inorder());
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
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function createRandomArray(){
    let arr=[];
    for(i=0;i<9;i++){
        arr.push(getRandomInt(1000));
    }
    return arr;
}
function insertValues(tree){
    for(i=0;i<9;i++){
        tree.insert(getRandomInt(1000));
    }
}
function testScript(){
    let tree=new Tree(createRandomArray());
    console.log("is the tree balanced:",tree.isBalanced());
    console.log("Level order:",tree.levelOrder());
    console.log("Preorder:",tree.preorder());
    console.log("Postorder:",tree.postorder());
    console.log("Inorder:",tree.inorder());
    insertValues(tree);
    console.log("is the tree balanced after inserting:",tree.isBalanced());
    tree.rebalance();
    console.log("is the tree balanced after rebalance:",tree.isBalanced());
    console.log("Level order:",tree.levelOrder());
    console.log("Preorder:",tree.preorder());
    console.log("Postorder:",tree.postorder());
    console.log("Inorder:",tree.inorder());
    console.log(prettyPrint(tree.root));
}
testScript();
