// const express = require('express');
// const server = express();
// // const helmet = require('helmet');
// // const morgan = require('morgan');

// // const projectRouter = require('./routes/projectRoute');
// const actionRouter = require('./routes/actionRoute');

// server.use(express.json());
// // server.use(helmet());
// // server.use(morgan('dev'));


// // server.use('/api/projects', projectRouter);
// server.use('/api/actions', actionRouter);

// server.listen(4000, () => {
//     console.log('\n* Server Running on http://localhost:4000 *\n')
// });

// module.exports = server;
const express = require('express');

const helmet = require('helmet');


const server = express();


server.use(helmet());
server.use(express.json());

const Actions = require('./data/helpers/actionModel');
const Projects = require('./data/helpers/projectModel');

//// Action Model ////
//GET
server.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the action!'});
    }
});
// //GET by id
server.get('/:id', async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({message: 'action not found'});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the action!'});
    }
});
// // POST 
server.post('/',  async (req, res) => {
    if (!req.body.description || !req.body.description === '') {
        res.status(400).json({message:'Please provide valid name'})
    }
    try {
        const action = await Actions.insert({description: req.body.description, notes: req.body.notes, project_id: req.body.project_id});
        res.status(201).json(action);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'error adding the action!'});
    }
});

// // DELETE 
server.delete('/:id', async (req, res) => {
    try {
        const count = await Actions.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({message: 'The user has been deleted'});
        } else {
            res.status(404).json({message: 'The user could not be found'});
        } 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error removing the user.'});
    }
});

// // PUT 
server.put('/:id', async (req, res) => {
    try {
        const action = await Actions.update(req.params.id, req.body);
        if(action) {
            res.status(200).json(action);
        }else {
            res.status(404).json({message: 'could not be found'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error updating the action.'});
    }
});

//// PROJECT MODEL ////

// GET
server.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the project!'});
    }
});
//GET by id
server.get('/:id', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({message: 'project not found'});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the project!'});
    }
});

// POST 
server.post('/', async (req, res) => {
    if (!req.body.name || req.body.name === '' || !req.body.description) {
        res.status(400).json({message:'Please provide valid text and user id'})
    }
    try {
        const project = await Projects.insert({name: req.body.name, description: req.body.description});
        res.status(201).json(project);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'error adding the post!'});
    }
});

// DELETE 
server.delete('/:id', async (req, res) => {
    try {
        const count = await Projects.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({message: 'The project has been deleted'});
        } else {
            res.status(404).json({message: 'The project could not be found'});
        } 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error removing the project.'});
    }
});

// PUT 
server.put('/:id', async (req, res) => {
    try {
        const project = await Projects.update(req.params.id, req.body);
        if(project) {
            res.status(200).json(project);
        }else {
            res.status(404).json({message: 'project could not be found'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error updating the project.'});
    }
})

server.get('/:id/actions', async (req,res) => {
    try {
        const project = await Projects.getProjectActions(req.params.id);
        if(project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'project not found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error finding the project' });
    }
})




// sanity check route
server.get('/', (req, res) => {
  res.status(200).json({ hello: 'World!' });
});

module.exports = server;