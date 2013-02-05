Set objArgs = WScript.Arguments
ZipFile = objArgs(0)
SourceFolder = objArgs(1)

' Create empty ZIP file and open for adding
CreateObject("Scripting.FileSystemObject").CreateTextFile(ZipFile, True).Write "PK" & Chr(5) & Chr(6) & String(18, vbNullChar)
Set zip = CreateObject("Shell.Application").NameSpace(ZipFile)

' Get items in source folder
Set sourceItems = CreateObject("Shell.Application").NameSpace(SourceFolder).Items

' Add all files/directories to the .zip file
zip.CopyHere(sourceItems)
WScript.Sleep 1000 'REQUIRED!! (Depending on file/dir size) or else files won't copy.
