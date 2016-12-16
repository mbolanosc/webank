var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PDFDocument = require('pdfkit');
var blobStream  = require('blob-stream');
var doc = new PDFDocument;
var stream = doc.pipe(blobStream());
