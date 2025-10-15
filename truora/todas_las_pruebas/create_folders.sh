#!/bin/bash

# Check if the data file exists
if [ -f "data.txt" ]; then
    while IFS= read -r folder_name; do
        # Create a folder for each name in the data file
        mkdir "$folder_name"
        echo "Folder '$folder_name' created."
    done < "data.txt"
else
    echo "data.txt file not found."
    exit 1
fi

