function fse(arr,i,n){
	if(i== n-i){

	}

	if (i===0) { 
		return ((arr[i])+ fse(arr,i+1,n)/n)
	} else {
		return ((arr[i])+ fse(arr,i-1,n)/n)
	}

}

list = [1,2,3]
fse(list,0,list.length)