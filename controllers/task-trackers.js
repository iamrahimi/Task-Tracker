const express = require('express');
const User = require('../models/User');
const TaskTracker = require('../models/Task-tracker');
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, CustomAPIError } = require('../errors');
// const { exist } = require('joi');

const createTaskTracker = async function (req, res) {
    const userid = {owner: req.user.userId} 
    req.body = {...req.body, ...userid};
  
    const taskTracker = await TaskTracker.create(req.body);
    return res.status(StatusCodes.CREATED).json({status: true, data: taskTracker, message:'Successfully created'});  
}

const getAllTaskTracker = async function (req, res) {

    let taskTracker =  TaskTracker.find({owner: req.user.userId});
    

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    taskTracker = taskTracker.skip(skip).limit(limit);
    taskTracker = await taskTracker;
    return res.status(StatusCodes.OK).json({status: true, data: taskTracker}); 
}

const getTaskTracker = async function (req, res) {
    const taskTracker = await TaskTracker.findById(req.params.id);
    return res.status(StatusCodes.OK).json({taskTracker});
}

const updateTaskTracker = async function (req, res) {
    const taskTrackerData = await TaskTracker.findById(req.params.id)

    const title = req.body.title || taskTrackerData.title;
    const description = req.body.description || taskTrackerData.description;
    const status = req.body.status || taskTrackerData.status;
    const proiority = req.body.proiority || taskTrackerData.proiority;

    const taskTracker = await TaskTracker.findByIdAndUpdate(
        {_id: req.params.id}, 
        {status:status, title: title, description: description, proiority:proiority}, 
        { new: true, runValidators: true });

    return res.status(StatusCodes.CREATED).json({status: true, data: taskTracker});  

    
}

const deleteTaskTracker = async function (req, res) {
    const taskTrackerData = await TaskTracker.findById(req.params.id);
    if(taskTrackerData.owner == req.user.userId){
        const taskTracker = await TaskTracker.findByIdAndDelete(req.params.id);
        if (!taskTracker) {
            throw new NotFoundError(`No task found`);
          }
          res.status(StatusCodes.OK).json({status: true, msg: "Successfully deleted"});
    }else {
        throw new NotFoundError("You don't have access to delete task, please contact your admin", StatusCodes.BAD_REQUEST);
    }
}



module.exports = {
    createTaskTracker, 
    getAllTaskTracker, 
    getTaskTracker, 
    updateTaskTracker,
    deleteTaskTracker
}


