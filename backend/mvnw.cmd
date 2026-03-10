@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM
@REM SPDX-License-Identifier: Apache-2.0

@echo off
setlocal enabledelayedexpansion

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@REM Add default JVM options here. You can also use JAVA_OPTS and MAVEN_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS="-Xmx64m" "-Xms64m"

@REM Resolve java executable to forward finder args
if "%JAVA_HOME%" == "" (
  for /f "tokens=*" %%i in ('where java 2^>nul') do set JAVA_HOME=%%~dpi..
  if not "%JAVA_HOME%"=="" (
    set JAVA_HOME=!JAVA_HOME:~0,-5!
  )
)

if not "%JAVA_HOME%"=="" (
  set JAVA_EXE=%JAVA_HOME%\bin\java.exe
) else (
  for /f "tokens=*" %%i in ('where java 2^>nul') do set JAVA_EXE=%%i
)

@REM Note: error and the Maven Wrapper tries to download Maven via network
@REM Please report a bug or request a feature at: https://github.com/apache/maven-wrapper/issues

set MAVEN_HOME=%APPDATA%\.m2\wrapper\dists\apache-maven-3.8.7
if not exist "%MAVEN_HOME%" (
  echo Downloading Maven 3.8.7...
  mkdir "%APPDATA%\.m2\wrapper\dists\apache-maven-3.8.7" 2>nul
  powershell -Command "Invoke-WebRequest -Uri 'https://archive.apache.org/dist/maven/maven-3/3.8.7/binaries/apache-maven-3.8.7-bin.zip' -OutFile '%APPDATA%\.m2\wrapper\dists\apache-maven-3.8.7\apache-maven-3.8.7-bin.zip'" 2>nul
  powershell -Command "Expand-Archive -Path '%APPDATA%\.m2\wrapper\dists\apache-maven-3.8.7\apache-maven-3.8.7-bin.zip' -DestinationPath '%APPDATA%\.m2\wrapper\dists\apache-maven-3.8.7'" 2>nul
  for /d %%d in (%APPDATA%\.m2\wrapper\dists\apache-maven-3.8.7\apache-maven-*) do (
    if exist "%%d" set MAVEN_HOME=%%d
  )
)

set MAVEN_CMD=%MAVEN_HOME%\bin\mvn.bat

if not exist "%MAVEN_CMD%" (
  echo Maven not found. Please install Maven 3.6.0 or later.
  exit /b 1
)

%MAVEN_CMD% %*
