#!/bin/bash

echo "========================================"
echo "  FitFuel AI - Docker Quick Start"
echo "========================================"
echo ""

# Check if Docker is running
if ! docker version > /dev/null 2>&1; then
    echo "ERROR: Docker is not running!"
    echo ""
    echo "Please start Docker and try again."
    echo ""
    exit 1
fi

echo "Docker is running! Starting FitFuel AI..."
echo ""
echo "Building and starting the application..."
echo "This may take a few minutes on first run..."
echo ""

docker-compose up --build

echo ""
echo "Application stopped."
