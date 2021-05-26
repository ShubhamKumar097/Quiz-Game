(function()
 {
  var allQuestions = [{
    question: "<b>What is the capital of Australia ?</b>",
    options: ["Dhaka", "Sydney", "Perth", "Canberra"],
    answer: 3
  }, {
    question: "<b>Who is the PM of India ?</b>",
    options: ["N Modi", "M M Singh", "L K Advani", "S Gandhi"],
    answer: 0
  }, {
    question: "<b>Who was the first Nobel prize winner from India ?</b>",
    options: ["B C Chatterjee", "R N Tagore", "C V Raman","Satyajit Ray"],
    answer: 1
  },{
    question: "<b>Which is the metal remains at Liquid at room temperature ?</b>",
    options: ["Magnesium", "Helium", "Mercury", "Phosphorous"],
    answer: 2
  }, {
    question: "<b>Chemical formula of water ?</b>",
    options: ["NaA1O2", "H2O", "Al2O3", "CaSiO3"],
    answer: 1
  },{
    question: "<b>Name the force which pulls us down to the earth ?</b>",
    options: ["Magnetic", "Upthurst", "Electric", "Gravitational"],
    answer: 3
  },{
    question: "<b>When India won the only T20 WC ?</b>",
    options: ["2009", "2007", "2011", "2016"],
    answer: 1
  },{
    question: "<b>Which country invented AK-47 ?</b>",
    options: ["Soviet union", "Germany", "USA", "Japan"],
    answer: 0
  },{
    question: "<b>Where does 1936 Olympics held ?</b>",
    options: ["India", "Japan", "Germany", "Russia"],
    answer: 2
  },{
    question: "<b>Who is the head of the all three armed forces in India ?</b>",
    options: ["President", "PM", "Home Minister", "CDS"],
    answer: 0
    }];

  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');

  nextQuestion();

  $('#next').click(function ()
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter]))
        {
            alert('Please select an option !');
        }
        else
        {
          quesCounter++;
          nextQuestion();
        }
    });

  $('#prev').click(function ()
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });

  function createElement(index)
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }

  function radioButtons(index)
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }

  function chooseOption()
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }

  function nextQuestion()
    {
        quizSpace.fadeOut(function()
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter])))
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    }
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }

  function displayResult()
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++)
        {
          if (selectOptions[i] === allQuestions[i].answer)
          {
            correct++;
          }
        }
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        return score;
  }
})();
