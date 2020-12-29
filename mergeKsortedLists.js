    // Definition for singly-linked list.
    //undefined means that you declared a variable that wasn't initialized
function ListNode(val, next) {
     this.val = (val===undefined ? 0 : val)
     this.next = (next===undefined ? null : next)
}

// LinkedList class where methods of a linkedlist reside
class LinkedList
{
    constructor() 
    {
        this.head = null  //head pointer
        this.tail = null; //tail pointer
        this.size = 0;    //size of linked list
    }

    addFirst(data) 
    {
        let node = new ListNode(data, null);  //create a new node
        if (this.head == null)               //the beginning of a linked list
        {
            this.head = node;               //head -> node -> null
            this.tail = node;              //tail -> node -> null
        }
        else 
        { 
            node.next = this.head;         //update head pointer
            this.head = node;           
        }
        this.size++;
    }
    addLast(data) 
    {
        let node = new ListNode(data, null);        //create a new node
        if (this.head == null)                      //if linked list is empty
        {
            this.head = node;
            this.tail = node;
        }
        else 
        {
            this.tail.next = node;                  //update tail pointer
            this.tail = node;
        }
        this.size++;
    }
}

const list = new LinkedList();  //first linked list
list.addLast(1);
list.addLast(4);
list.addLast(5);

const list2 = new LinkedList(); //second linked list
list2.addLast(1);
list2.addLast(3);
list2.addLast(4);

const list3 = new LinkedList(); //Third Linked List
list3.addLast(2);
list3.addLast(6);

const arr = []      //push all three linked list to an array
arr.push(list);
arr.push(list2);
arr.push(list3);

const mergedArr = [];   //insert every element from each linked list into an array 
arr.forEach(index => {
    let current = index.head;
    while (current.next != null) 
    {
        mergedArr.push(current.val);
        current = current.next;
    }
    mergedArr.push(current.val);
});

//implementing merged sort to sort mergedArr, runtime(O(nlogn))
mergeSort = (list) =>
{
    if (list.length > 1)
    {
        let mid = Math.floor(((list.length - 1) / 2));
        console.log(`mid ${mid}`);
        let left = mergeLeft(list, mid);
        console.log(`left: ${left}`);
        mergeSort(left);
        let right = mergeRight(list, mid);
        console.log(`right: ${right}`);
        mergeSort(right);
        merge(left,right, list);
    }
}

mergeLeft = (list, mid) => 
{
    left = [];

    for (let i = 0; i <= mid; i++) 
    {
        if (i <= mid) {
            left.push(list[i]);
        }
    }
    return left;
}

mergeRight = (list, mid) => 
{
    right = []
    for (let i = mid + 1; i < list.length; i++) 
    {
            right.push(list[i]);
    }
    return right;
}

merge = (list1, list2, result) => {
    let i = 0, j = 0, k = 0;

    while (i < list1.length && j < list2.length)
    {
        if (list1[i] < list2[j])
        {
            result[k] = list1[i];
            i++;
        }
        else 
        {
            result[k] = list2[j]
            j++;
        }
        k++;
    }
    while (i < list1.length)
    {
        result[k] = list1[i];
        i++;
        k++;
    }

    while (j < list2.length) 
    {
        result[k] = list2[j];
        j++;
        k++;
    }
}

mergeSort(mergedArr);           //sort mergedArr

//Store elements from sorted array into a single linked list
const finalLinkedList = new LinkedList();
mergedArr.forEach(element => {
    finalLinkedList.addLast(element);
});


//print elements
let current = finalLinkedList.head;
while (current.next != null) 
{
    console.log(`${current.val} `);
    current = current.next;
}
console.log(current.val);