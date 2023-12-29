const $cupcakeList = $('#cupcake-list');
const $deleteBtn = $('#delete-button');
const $form = $('#cupcake-form');
const myURL = "/api/cupcakes"

async function getCupcakes(){
    response = await axios.get('/api/cupcakes')
    result = response.data

    return result.cupcakes
}

function createCupcakeLI(data){
    console.log(data)
    let newLI = $("<li></li>")
    newLI.attr('class', 'container')
    let flavor = $("<h3></h3>").text(`Flavor: ${data.flavor}`);
    let rating = $("<h3></h3>").text(`Rating: ${data.rating}`);
    let size = $("<h3></h3>").text(`Size: ${data.size}`)
    let img = $("<img>").attr('src', data.image)
    let deleteBtn = $("<button></button>").text("Delete").attr('id', 'delete-button').attr('cupcake-id', `${data.id}`)
    newLI.append(flavor,rating, size, img, deleteBtn)
    deleteBtn.click((e)=>{
        let cupcakeID = e.target.getAttribute('cupcake-id')
        deleteCupcake(cupcakeID)
        deleteBtn.parent().remove()
        
    })
    return newLI
}

function createInitialCupcakeHTML(data_list){
    console.log(data_list)
    data_list.forEach((data)=>{
        let newElement = createCupcakeLI(data)
        $cupcakeList.prepend(newElement)
    })

}

async function deleteCupcake(id){
    await axios.delete(`${myURL}/${id}`)
}

async function createCupcake(params){
    let response = await axios.post(`${myURL}`,params)
    return response
}

function startUp(){
        getCupcakes().then((cupcake_data)=>{
        createInitialCupcakeHTML(cupcake_data);
    })
    
}


$form.submit(async (e)=>{
    e.preventDefault();
    let flavor = e.target.flavor.value
    let rating = e.target.rating.value
    let size = e.target.size.value
    let image = e.target.image.value
    if(image === ''){
        image = null
    }
    params = {
        flavor:flavor,
        rating:rating,
        size:size,
        image:image
    }
    console.log(params)
    await createCupcake(params=params).then((response)=>{
        console.log(response)
        let new_data = response.data.cupcake
        if(response.status === 201){
            $cupcakeList.prepend(createCupcakeLI(new_data))
        }
        else{
            alert('Failed to submit')
        }
    })
})



startUp()