import React, { useState, useEffect } from "react";
import Tags from "../Tags";
import ContentForm from "../ContentForm";
import styled from "styled-components";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const CenteredArticles = styled.article`
    margin: 0 auto;
  `;

  useEffect(() => {
    const localStorageArticles = localStorage.getItem("articles");
    if (!localStorageArticles) {
      fetch("/json/posts.json")
        .then(res => res.json())
        .then(res => {
          localStorage.setItem("articles", JSON.stringify(res));
          setArticles(res);
        });
    } else {
      setArticles(JSON.parse(localStorageArticles));
    }
  }, []);

  const onAddNewArticle = article => {
    const newArticles = articles.concat({
      ...article,
      tags: article.tags.split(","),
      id: Date.now()
    });
    setArticles(newArticles);
    localStorage.setItem("articles", JSON.stringify(newArticles));
  };

  const onDeleteArticle = id => {
    const newArticles = articles.filter(article => article.id !== id);
    setArticles(newArticles);
    localStorage.setItem("articles", JSON.stringify(newArticles));
  };

  return (
    <div>
      <div id="posts" className={articles && articles.length ? "well" : ""}>
        {articles.map(article => {
          const { id, title, body, tags } = article;
          return (
            <CenteredArticles key={id}>
              <header>
                <h3>{title}</h3>
              </header>
              <section>
                <p>{body}</p>
              </section>
              <footer>
                <Tags tags={tags} articleId={id} />
              </footer>
              <div className="controls">
                <button
                  className="btn btn-danger btn-mini"
                  onClick={() => onDeleteArticle(id)}
                >
                  удалить
                </button>
              </div>
            </CenteredArticles>
          );
        })}
      </div>
      <ContentForm addNewArticle={onAddNewArticle} />
    </div>
  );
};

export default Articles;
