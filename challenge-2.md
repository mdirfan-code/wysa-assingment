# Leetcode Solution

### Explaination
Given, that we need to verify whether given tree if Binary Search Tree or not.
So, let me first explain what is BST, in BTS left child of root needs to be smaller than root and right child of root needs to be larger than root.

There are various approach we can use to solve this problem, we can find inorder representation of tree in array, and if array is sorted than given tree is BTS.
But it takes worst case time complexity `O(2^N)(finding inorder representation) + O(N)(verifying sorter array)`.

So, I am going with backtracking algorithm which is time efficient (`O(2^N)`).

Problem Link : https://leetcode.com/problems/validate-binary-search-tree/ .

### Code

```
var isValidBST = function(root) {
    var isV = (root,l,u) =>
           { 
               if(root == null){
                   return true;
               }
                
            return (l < root.val && root.val < u ) && isV(root.left,l,root.val) && isV(root.right,root.val,u);
           }
        return isV(root,-(2**31+1),(2**31));
    
};
```