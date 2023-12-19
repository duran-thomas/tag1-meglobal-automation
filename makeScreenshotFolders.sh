#!/bin/bash




# Source directory containing folders 
source_directory="./test/pageobjects/CMS/Components/"

# Destination directory where new folders will be created
destination_directory="./screenshots2"

# Ensure the destination directory exists
mkdir -p "$destination_directory"

# List all files in the source directory
files=("$source_directory"/*)

# Iterate through each file and create a corresponding folder in the destination directory
for file in "${files[@]}"; do
    # Extract the file name without the path
    file_name=$(basename "$file")

    # Split at '.' and capitalize the first letter
    folder_name="${file_name%%.*}"
    folder_name_capitalized=$(echo "$folder_name" | sed 's/\(.*\)\..*/\1/' | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}')

    # Create a corresponding folder in the destination directory
    mkdir -p "$destination_directory/$folder_name_capitalized"
done

echo "Folders created in $destination_directory."
