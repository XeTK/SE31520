rm report.aux
rm report.bbl
rm report.bcf
rm report.blg
rm report.dvi
rm report.log
rm report.run.xml
rm report.toc

latex report
biber report
latex report
biber report
latex report
pdflatex report
open report.pdf