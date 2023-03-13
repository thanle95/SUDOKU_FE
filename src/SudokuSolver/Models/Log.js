export class Log{
    /**
     * 
     * @param {Array<String>} InitMatrix 
     * @param {Array<String>} SolvedMatrix 
     * @param {DateTime} StartDate 
     * @param {DateTime} SolvedDate 
     */
    constructor(InitMatrix, SolvedMatrix, StartDate, SolvedDate){
        this.InitMatrix = InitMatrix
        this.SolvedMatrix = SolvedMatrix
        this.StartDate = StartDate
        this.SolvedDate = SolvedDate
    }
}