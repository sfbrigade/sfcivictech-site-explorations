require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const app = express();
app.use(cors({ origin: '*'}));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const NOTION_KEY = process.env.NOTION_API_KEY;

const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: NOTION_KEY,
})

app.post('/api/databases/add_user', upload.none(), async (req, res) => {
    console.log(req.body);

    try{
        await notion.pages.create({
        "parent": {
            "type": "database_id",
            "database_id": "3664f66c7e894dd296b9182534f3b8db"
        },
        "properties": {
            "Full Name": {
                "title": [
                    {
                        "text": {
                            "content": req.body.name
                        }
                    }
                ]
            },
            "Email": {
                "email": req.body.email
            },
            "LinkedIn": {
                "url": req.body.linkedin
            },
            "Subscribe to newsletter": {
                "checkbox": req.body.newsletter === 'on' ? true : false
            }
        }

        
    });
    res.send('User added to database');
    } catch (error) {
        console.error(error.body);
        res.status(500).send('Error adding user to database');
    
    }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});