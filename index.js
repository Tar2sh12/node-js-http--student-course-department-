
const http=require("http");
const fs = require('fs');
http.createServer((req,res)=>{
    const {url,method}=req;
    //====================================STUDENT APIs====================================


    //2- GetAll students 
    if(url==='/' && method==="GET"){
        const newData = JSON.parse(fs.readFileSync('./students.json'));
        res.write(JSON.stringify(newData));
        res.end();
    }


    //1- add student
    else if(url==='/student' && method==="POST"){
        const newData = JSON.parse(fs.readFileSync('./students.json'));
        let data =''
        req.on('data',(item)=>{ //async func
            data=JSON.parse(item);
        })
        req.on('end',()=>{ //async func
            newData.push(data)
            res.write(JSON.stringify(newData))
            fs.writeFileSync('./students.json',JSON.stringify(newData))
            res.end()
        })
    }


    //5- update student 
    else if(url.startsWith('/student/') && method==="PUT"){
        const newData = JSON.parse(fs.readFileSync('./students.json'));
        let studId=Number(url.split('/')[2]);
        let index = newData.findIndex((s)=>s.id==studId);
        if(index==-1){
            return res.end("doesn't found");
        }
        req.on('data',(chunk)=>{
            let studUpd=JSON.parse(chunk);
            // move this code to req.on('end',()=>{})
            let listOfKeys=Object.keys(studUpd);
            listOfKeys.forEach(studKey => {
                newData[index][studKey]=studUpd[studKey];
            });
            res.statusCode=200;
            fs.writeFileSync('./students.json',JSON.stringify(newData))
            res.end(JSON.stringify(newData))
        })

    }    


    //4- delete student
    else if(url.startsWith('/student/') && method==="DELETE"){
        const newData = JSON.parse(fs.readFileSync('./students.json'));
        let studId=Number(url.split('/')[2]);

        let index = newData.findIndex((s)=>s.id==studId);
        if(index==-1){
            return res.end("doesn't found");
        }
        newData.splice(index,1);

        fs.writeFileSync('./students.json',JSON.stringify(newData))
        res.end(JSON.stringify(newData))
    }


    //6- search by id 
    else if(url.startsWith('/student/')  && method==="GET"){
        const newData = JSON.parse(fs.readFileSync('./students.json'));
        let studId=Number(url.split('/')[2]);
        let index = newData.findIndex((s)=>s.id==studId);
        if(index==-1){
            return res.end("doesn't found");
        }
        res.write(JSON.stringify(newData[index]));
        res.end();
    }


    //3- Get all students with their department and courses related to the department
    else if(url==='/allData' && method==="GET"){
        const readStudents = JSON.parse(fs.readFileSync('./students.json'));
        const readCourses = JSON.parse(fs.readFileSync('./courses.json'));
        const readDepts = JSON.parse(fs.readFileSync('./depts.json'));
        let returnedArray=[]
        readStudents.forEach(element => {
            const deptart_id=element.deptId;
            element = Object.assign(element, {department: readDepts.find((e)=>{return e.id==deptart_id;})} , {courses:readCourses.filter((e)=>{
                     return deptart_id==e.deptId;
                })});
                console.log(element);
                returnedArray.push(element)
        });
        res.end(JSON.stringify(returnedArray));
    }


    //====================================COURSES APIs====================================


        //4- GetAll courses 
        if(url==='/courses' && method==="GET"){
            const newData = JSON.parse(fs.readFileSync('./courses.json'));
            res.write(JSON.stringify(newData));
            res.end();
        }
    
    
        //1- add course
        else if(url==='/addCourse' && method==="POST"){
            const newData = JSON.parse(fs.readFileSync('./courses.json'));
            let data =''
            req.on('data',(item)=>{ //async func
                data=JSON.parse(item);
            })
            req.on('end',()=>{ //async func
                newData.push(data)
                res.write(JSON.stringify(newData))
                fs.writeFileSync('./courses.json',JSON.stringify(newData))
                res.end()
            })
        }
    
    
        //5- update course attributes 
        else if(url.startsWith('/course/') && method==="PUT"){
            const newData = JSON.parse(fs.readFileSync('./courses.json'));
            let curdId=Number(url.split('/')[2]);
            let index = newData.findIndex((c)=>c.id==curdId);
            if(index==-1){
                return res.end("doesn't found");
            }
            req.on('data',(chunk)=>{
                let curUpd=JSON.parse(chunk);
                let listOfKeys=Object.keys(curUpd);
                listOfKeys.forEach(key => {
                    newData[index][key]=curUpd[key];
                });
                res.statusCode=200;
                fs.writeFileSync('./courses.json',JSON.stringify(newData))
                res.end(JSON.stringify(newData))
            })
        }    
    
        //4- delete course 
        else if(url.startsWith('/course/') && method==="DELETE"){
            const newData = JSON.parse(fs.readFileSync('./courses.json'));
            let curdId=Number(url.split('/')[2]);
    
            let index = newData.findIndex((c)=>c.id==curdId);
            if(index==-1){
                return res.end("doesn't found");
            }
            newData.splice(index,1);
            fs.writeFileSync('./courses.json',JSON.stringify(newData))
            res.end(JSON.stringify(newData))
        }
    
    
        //6- search by id 
        else if(url.startsWith('/course/')  && method==="GET"){
            const newData = JSON.parse(fs.readFileSync('./courses.json'));
            let curId=Number(url.split('/')[2]);
            let index = newData.findIndex((c)=>c.id==curId);
            if(index==-1){
                return res.end("doesn't found");
            }
            res.write(JSON.stringify(newData[index]));
            res.end();
        }
    
    //====================================DEPARTMENT APIs====================================


        //4- GetAll depts 
        if(url==='/depts' && method==="GET"){
            const newData = JSON.parse(fs.readFileSync('./depts.json'));
            res.write(JSON.stringify(newData));
            res.end();
        }
    
    
        //1- add depts
        else if(url==='/addDepts' && method==="POST"){
            const newData = JSON.parse(fs.readFileSync('./depts.json'));
            let data =''
            req.on('data',(item)=>{ //async func
                data=JSON.parse(item);
            })
            req.on('end',()=>{ //async func
                newData.push(data)
                res.write(JSON.stringify(newData))
                fs.writeFileSync('./depts.json',JSON.stringify(newData))
                res.end()
            })
        }
    
    
        //5- update depts attributes 
        else if(url.startsWith('/depts/') && method==="PUT"){
            const newData = JSON.parse(fs.readFileSync('./depts.json'));
            let deptId=Number(url.split('/')[2]);
            let index = newData.findIndex((d)=>d.id==deptId);
            if(index==-1){
                return res.end("doesn't found");
            }
            req.on('data',(chunk)=>{
                let deptUpd=JSON.parse(chunk);
                let listOfKeys=Object.keys(deptUpd);
                listOfKeys.forEach(key => {
                    newData[index][key]=deptUpd[key];
                });
                res.statusCode=200;
                fs.writeFileSync('./depts.json',JSON.stringify(newData))
                res.end(JSON.stringify(newData))
            })
        }    
    
        //4- delete dept 
        else if(url.startsWith('/depts/') && method==="DELETE"){
            const newData = JSON.parse(fs.readFileSync('./depts.json'));
            let deptId=Number(url.split('/')[2]);
    
            let index = newData.findIndex((d)=>d.id==deptId);
            if(index==-1){
                return res.end("doesn't found");
            }
            newData.splice(index,1);
            fs.writeFileSync('./depts.json',JSON.stringify(newData))
            res.end(JSON.stringify(newData))
        }
    
    
        //6- search by id 
        else if(url.startsWith('/depts/')  && method==="GET"){
            const newData = JSON.parse(fs.readFileSync('./depts.json'));
            let deptId=Number(url.split('/')[2]);
            let index = newData.findIndex((d)=>d.id==deptId);
            if(index==-1){
                return res.end("doesn't found");
            }
            res.write(JSON.stringify(newData[index]));
            res.end();
        }

    

}).listen(3001,()=>{console.log("running on port 3001");})