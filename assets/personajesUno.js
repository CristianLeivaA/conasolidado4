let url = "https://swapi.dev/api/people";
        fetch(url)
            .then( response => response.json() )
            .then( data => mostrarData(data) )
            .catch( error => console.log(error) )

        const mostrarData = (data) => {
            console.log(data)
            let body = ""
            for (var i = 0; i < data.length; i++) {      

                
                        body+=`<div><h5>${data[i].name}</h5><p>${data[i].height},${data[i].mass}</p></div>`


                
               
            }
            document.getElementById('data').innerHTML = body
        }

