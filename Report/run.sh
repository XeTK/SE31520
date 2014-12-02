rm report.aux
rm report.bbl
rm report.bcf
rm report.blg
rm report.dvi
rm report.log
rm report.run.xml
rm report.toc

pdflatex report
biber report
pdflatex report
biber report
pdflatex report
open report.pdf