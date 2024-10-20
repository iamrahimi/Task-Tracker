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

    const { search, status, proiority, sortBy } = req.query;

    const queryObject = {
        owner: req.user.userId,
    };

    if (search) {
        queryObject.title = { $regex: search, $options: 'i' };
    }

    if (status) {
        queryObject.status = { $regex: status, $options: 'i' };
    }

    if (proiority) {
        queryObject.proiority = { $regex: proiority, $options: 'i' };
    }

    if (status && status !== 'all') {
        queryObject.status = status;
    }
    
    let taskTracker =  TaskTracker.find(queryObject);

    if (sortBy === 'latest') {
        taskTracker = taskTracker.sort('-createdAt');
    }
    if (sortBy === 'oldest') {
        taskTracker = taskTracker.sort('createdAt');
    }
    if (sortBy === 'a-z') {
        taskTracker = taskTracker.sort('title');
    }
    if (sortBy === 'z-a') {
        taskTracker = taskTracker.sort('-title');
    }

    const totalTask = await TaskTracker.countDocuments(queryObject);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    taskTracker = taskTracker.skip(skip).limit(limit);
    taskTracker = await taskTracker;
    
    return res.status(StatusCodes.OK).json({status: true, totalTask:totalTask, data: taskTracker}); 
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


